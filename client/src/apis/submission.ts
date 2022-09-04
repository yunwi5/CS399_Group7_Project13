import { AppProperty } from '../constants/app';
import { postRequest } from './requests';
import { ITestCase, ITestResult, IUserSubmission } from '../models/interfaces';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/submission`;

// Request body: {code: string, language: string (language_code),  testCases: Array<{code, expectedOutput}>}
type RunRequestBody = { code: string; language: string; testCases: ITestCase[] };
export async function runTestCases(body: RunRequestBody) {
    return await postRequest<ITestResult[]>({ url: `${API_DOMAIN}/run`, body });
}

// Get userSubmission for the particular exercise
export async function getSubmission(exerciseId: string) {
    // Implement the GET request
}

// UserSubmission to the backend
type SubmissionBody = { code: string };
export async function postSubmission(exerciseId: string, body: SubmissionBody) {
    return await postRequest<IUserSubmission>({
        url: `${API_DOMAIN}/${exerciseId}`,
        body,
    });
}