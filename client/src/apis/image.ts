import { AppProperty } from '../constants/app';
import { postRequest } from './requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/image`;

export function postExercisePromptImage(body: { image: string; exerciseId?: string }) {
    return postRequest<any>({ url: `${API_DOMAIN}/exercise`, body });
}

export function postUserImage(body: { image: string }) {
    return postRequest<{ publicId: string; url: string; user: string }>({
        url: `${API_DOMAIN}/user`,
        body,
    });
}

export function deleteImageByUrl(url: string) {
    return postRequest<any>({ url: `${API_DOMAIN}`, body: { url } });
}
