import React, { useState } from 'react';
import EditorControlBar from '../EditorControlBar';
import ExerciseInfoNav from './nav/ExerciseInfoNav';
import ExercisePrompt from './sub-sections/exercise-prompt/ExercisePrompt';
import ScratchPad from './sub-sections/scratch-pad/ScratchPad';
import TestCasesDisplay from './sub-sections/test-cases/TestCasesDisplay';

export enum SubSection {
    PROMPT = 'Prompt',
    TEST_CASES = 'Test Cases',
    SCRATCH_PAD = 'Scratch Pad',
}

export const SubSectionList = Object.freeze(Object.values(SubSection));

// Left side of the code editor page.
const ExerciseInfoSection: React.FC = () => {
    const [activeSubSection, setActiveSubSection] = useState(SubSection.PROMPT);

    return (
        <div className="flex-1 flex flex-col text-gray-700">
            <div className="block lg:hidden">
                <EditorControlBar />
            </div>
            <ExerciseInfoNav
                activeSubSection={activeSubSection}
                setActiveSubSection={setActiveSubSection}
            />
            {activeSubSection === SubSection.PROMPT && <ExercisePrompt />}
            {activeSubSection === SubSection.TEST_CASES && <TestCasesDisplay />}
            {activeSubSection === SubSection.SCRATCH_PAD && <ScratchPad />}
        </div>
    );
};

export default ExerciseInfoSection;