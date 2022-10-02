import React, { useMemo, useState } from 'react';
import { VotingItemSortingKey, SortingDirection } from '../../../models/enums';
import VotingItemSorter from '../../ui/sorting/VotingItemSorter';
import { useShowcase } from '../../../store/context/ShowcaseContext';
import useExerciseShowcaseQuery from '../../../hooks/exercise-queries/useExerciseShowcaseQuery';
import ShowcaseList from '../../ui/lists/ShowcaseList';
import { sortVotingItems } from '../../../utils/sorting-utils/voting-items.sorting';
import { IShowCase } from '../../../models/interfaces';

const ShowcaseShowcases: React.FC = () => {
    const { exercise } = useShowcase();
    const [sortingState, setSortingState] = useState({
        key: VotingItemSortingKey.VOTES,
        direction: SortingDirection.DESCENDING,
    });
    if (!exercise) return null;
    const { showcases } = useExerciseShowcaseQuery(exercise._id);

    // Whenver sorting state changes, sort the showcases again.
    const sortedShowcases = useMemo(() => {
        return sortVotingItems(
            showcases,
            sortingState.key,
            sortingState.direction,
        ).slice() as IShowCase[];
    }, [sortingState, showcases]);

    return (
        <div className="flex flex-col px-1 md:px-4">
            <div className="flex flex-wrap flex-row justify-between items-center gap-x-3 mb-5">
                {/* Component that handles the selection of sorting key and direction from the user. */}
                <VotingItemSorter
                    sortingState={sortingState}
                    setSortingState={setSortingState}
                />
                <h5 className="text-gray-500 font-bold text-lg">
                    {showcases.length} Showcases
                </h5>
            </div>
            <ShowcaseList showcases={sortedShowcases} exercise={exercise} />
        </div>
    );
};

export default ShowcaseShowcases;
