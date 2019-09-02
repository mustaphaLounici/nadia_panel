import { GET_PROJECTS, ADD_PROJECT, GET_PROJECT, EDIT_PROJECT } from "./types";
import history from "../history";
import {
  createProject as createAsanaProject,
  createTask as createAsanaTask,
  client as asana
} from "../utils/asana";
import {
  createProject as createTogglProject,
  createTask as createTogglTask
} from "../utils/toggl";

export const getProjects = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("projects")
    .get()
    .then(async snapshot => {
      const projectsP = snapshot.docs.map(async doc => {
        const project = { id: doc.id, ...doc.data() };
        project.asanaData = await asana.projects.findById(
          project.asanaProjectID
        );
        console.log(project.asanaData);
        return project;
      });

      const projects = await Promise.all(projectsP);
      dispatch({
        type: GET_PROJECTS,
        payload: projects
      });
    });
};
export const getProject = id => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("projects")
    .doc(id)
    .get()
    .then(doc => {
      dispatch({
        type: GET_PROJECT,
        payload: { id: doc.id, ...doc.data() }
      });
    });
};

export const addProject = newProject => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  const storageRef = firebase.storage().ref("/attachments");
  const {
    project_name: name,
    due_date,
    comments: notes,
    phases,
    owner,
    client_id
  } = newProject;

  // if attachments : upload it
  if (newProject.attachment) {
    const attachmentImage = await storageRef
      .child(newProject.attachment.name)
      .put(newProject.attachment);
    newProject.attachment = await attachmentImage.ref.getDownloadURL();
  }

  // create asana projects
  const asanaProject = await createAsanaProject({
    name,
    notes,
    due_date,
    owner
  });
  const asanaProjectID = asanaProject.gid;

  // create toggl Project
  const togglProject = await createTogglProject({ name }, client_id);
  const togglProjectID = togglProject.id;

  // create nadia project
  const project = {
    ...newProject,
    asanaProjectID,
    togglProjectID
  };

  const newProjectRef = await firestore.collection("projects").add(project);

  const tasksP = phases.map(async phase => {
    console.log(phase);
    const asanaTask = await createAsanaTask({
      projectID: asanaProjectID,
      data: phase
    });

    const togglTask = await createTogglTask(phase, togglProjectID);
    await firestore
      .collection("projects")
      .doc(newProjectRef.id)
      .collection("phases")
      .add({
        asanaTaskID: asanaTask.gid,
        togglTaskID: togglTask.id,
        ...phase
      });
  });
  await Promise.all(tasksP);

  dispatch({
    type: ADD_PROJECT,
    payload: { id: newProjectRef.id, ...project }
  });
  history.push("/projects");
};

export const editProject = (id, updProject) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  return firestore
    .collection("projects")
    .doc(id)
    .update(updProject)
    .then(doc => {
      dispatch({
        type: EDIT_PROJECT,
        payload: { id, ...updProject }
      });
    });
};
