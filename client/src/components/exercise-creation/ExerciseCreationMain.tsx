import CreationHeader from './header/CreationHeader';
import CreationSidebar from './sidebar/CreationSidebar';
import ChallengeActions from './sections/ChallengeActions';
import ChallengeName from './sections/ChallengeName';
import ChallengePrompt from './sections/ChallengePrompt';
import ChallengeSettings from './sections/ChallengeSettings';
import ChallengeSolution from './sections/ChallengeSolution';
import ChallengeTemplate from './sections/ChallengeTemplate';
import ChallengeTestCases from './sections/ChallengeTestCases';

// Main component for rendering the exercise creation page.
// This page defines the overall layout for the page.
const ExerciseCreationMain = () => {
    return (
        <main className="flex justify-center lg:gap-8 xl:gap-[7.5%] mb-6 px-3 md:px-5 xl:px-10 py-10 text-gray-700">
            <div className="lg:max-w-[75vw] xl:max-w-[min(70vw,55rem)] flex-1 flex flex-col gap-12">
                <CreationHeader />
                <ChallengeName />
                {/* Settings for difficulty, language, topic, and tags */}
                <ChallengeSettings />
                <ChallengePrompt />
                <ChallengeSolution />
                {/* Component for rendering user starting template code */}
                <ChallengeTemplate />
                <ChallengeTestCases />
                {/* Component for a set of buttons like 'Run Code', 'Save Changes' etc. */}
                <div className="lg:hidden">
                    <ChallengeActions />
                </div>
            </div>
            <CreationSidebar />
        </main>
    );
};

export default ExerciseCreationMain;
