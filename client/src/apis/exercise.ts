import { AppProperty } from "../constants/app";
import {
  IComment,
  IExercise,
  IExerciseWithId,
  IIssueReport,
  IShowCase,
  IUserSubmission,
  IVote,
} from "../models/interfaces";
import { deleteRequest, getRequest, postRequest, putRequest } from "./requests";

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/exercise`;

// fetch exercise list from the backend
export async function getExercises() {
  return await getRequest<IExerciseWithId[]>({ url: API_DOMAIN });
}

export async function getExerciseById(id: string) {
  return await getRequest<IExerciseWithId | undefined>({
    url: `${API_DOMAIN}/${id}`,
  });
}

export async function postExercise(exercise: IExercise) {
  return await postRequest<IExerciseWithId>({
    url: API_DOMAIN,
    body: exercise,
  });
}

export async function putExercise(id: string, updatedExercise: IExercise) {
  return await putRequest<IExerciseWithId>({
    url: `${API_DOMAIN}/${id}`,
    body: updatedExercise,
  });
}

export async function deleteExercise(id: string) {
  return await deleteRequest<{ message: string }>({
    url: `${API_DOMAIN}/${id}`,
  });
}

// GET: submission history of an exercise as a UserSubmission[]
export async function getExerciseSubmissions(id: string) {
  return await getRequest<IUserSubmission[]>({
    url: `${API_DOMAIN}/${id}/submission`,
  });
}

type ReportProps = { category: string; description: string };
export async function postExerciseReport(id: string, reportBody: ReportProps) {
  return await postRequest<IIssueReport>({
    url: `${API_DOMAIN}/${id}/report`,
    body: reportBody,
  });
}

export async function getExerciseReports(id: string) {
  return await getRequest<IIssueReport[]>({
    url: `${API_DOMAIN}/${id}/report`,
  });
}

export async function likeExerciseRequest(id: string) {
  return await getRequest<IExercise>({ url: `${API_DOMAIN}/${id}/like` });
}

// POST: post user showcase solution
type ShowcaseProps = { code: string; description: string };
export async function postExerciseShowCase(
  id: string,
  showcaseProps: ShowcaseProps
) {
  return await postRequest<IShowCase>({
    url: `${API_DOMAIN}/${id}/showcase`,
    body: showcaseProps,
  });
}

export async function getExerciseShowcases(id: string) {
  return await getRequest<IShowCase[]>({
    url: `${API_DOMAIN}/${id}/showcase`,
  });
}

export async function getExerciseComments(id: string) {
  return await getRequest<IComment[]>({ url: `${API_DOMAIN}/${id}/comment` });
}

export async function postExerciseComment(
  id: string,
  comment: { text: string }
) {
  return await postRequest<IComment>({
    url: `${API_DOMAIN}/${id}/comment`,
    body: comment,
  });
}

// POST vote for showcase

export async function postVoteRequest(
  id: string,
  vote: { type: "up" | "down" }
) {
  return await postRequest<IVote>({
    url: `${AppProperty.SERVER_DOMAIN}/api/showcase/${id}/vote`,
    body: vote,
  });
}

export function deleteShowcaseVote(showcaseId: string) {
  return deleteRequest<IVote>({
    url: `${AppProperty.SERVER_DOMAIN}/api/showcase/${showcaseId}/vote`,
  });
}
