import React, { useMemo } from 'react';

import useExerciseTopQuery from '../../hooks/exercise-queries/useExerciseTopQuery';
import ExerciseList from '../ui/lists/ExerciseList';
import { IExerciseCard } from '../../models/interfaces';
import { mapExercisesToExerciseCards } from '../../utils/exercise-utils/exercise';
import ArrowLink from '../ui/links/ArrowLink';

const TopExercises: React.FC = () => {
    const { exercises } = useExerciseTopQuery(3);
    const exerciseCards: IExerciseCard[] = useMemo(
        () => mapExercisesToExerciseCards(exercises),
        [exercises],
    );
    return (
        <div className="h-fit w-full">
            <div className="lg:grid lg:grid-cols-3 h-full py-3 lg:py-8 px-4 sm:px-10 md:px-16 md:grid-cols-1">
                <div className="col-span-1 flex justify-center items-start lg:items-center flex-col content-center xl:pl-16">
                    <div>
                        <h1 className="text-text-main-500 text-3xl my-2">
                            Top Exercises
                        </h1>
                        <h2 className="lg:w-2/4 mt-4 mb-2 leading-7 sm:w-full">
                            Browse the top rated exercises created by students tailor made
                            for the courses you are taking
                        </h2>
                        <ArrowLink to="/browse">Explore</ArrowLink>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="my-12">
                        <ExerciseList exercises={exerciseCards} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopExercises;
