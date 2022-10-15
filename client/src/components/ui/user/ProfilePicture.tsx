import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';

interface Props {
    picture: string | undefined;
    size?: string;
    className?: string;
}

// Displays profile picture of the user.
// If the user has a picture link to display, show the picture in the circle.
// If the user has no picture, show some placeholder user icon in the circle.
const ProfilePicture: React.FC<Props> = ({ size = '2rem', picture, className = '' }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageValid, setImageValid] = useState(true);

    // Prevent showing broken image
    useEffect(() => {
        if (!imageRef.current) return;

        const image = imageRef.current;
        // Check if the image is loaded successfully
        const isValid = image.naturalHeight === 0;

        if (isValid) {
            // Hide the image if the image load is invalid
            setImageValid(false);
        } else {
            setImageValid(true);
        }
    }, [imageRef.current?.complete, imageRef.current?.naturalHeight]);

    return (
        <div
            className={`flex-center shrink-0 overflow-hidden rounded-full shadow bg-gray-200 ${className}`}
            style={{ width: size, height: size }}
        >
            <FaUser className="text-gray-600 scale-90 translate-y-1" size={size} />
            <img
                ref={imageRef}
                src={picture}
                className={`min-w-full min-h-full object-cover ${
                    imageValid ? '' : 'hidden'
                }`}
            />
        </div>
    );
};

// Check if the image path is valid, to prevent broken image to be displayed.
// function isValidImagePath(pictureUrl: string | undefined) {
//     if (!pictureUrl) return false;

//     // External image url pattern
//     const externalUrlPattern =
//         /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

//     // App internal avatar path pattern
//     const avatarPattern = /\/src\/assets\/avatars\/.+/;

//     // If the pictureUrl is a valid image path, return true
//     if (pictureUrl.match(externalUrlPattern) || pictureUrl.match(avatarPattern))
//         return true;

//     // if the pictureUrl is invalid, return false
//     return false;
// }

export default ProfilePicture;
