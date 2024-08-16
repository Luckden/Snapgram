
import { useDeleteSavedPost, useLikePost, useSavePost, useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

type PostStatsProps = {
    post: Models.Document;
    userId: string;
}
const PostStats = ({post, userId}: PostStatsProps) => {

    const likesList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const {mutate: likePost} = useLikePost();
    const {mutate: savePost, isPending: isSavingPost} = useSavePost();
    const {mutate: deleteSavedPost, isPending: isDeletingSaved} = useDeleteSavedPost();

    const { data: currentUser, isLoading, isError } = useGetCurrentUser();

    useEffect(() => {
        if (!isLoading && !isError) {
            // Make sure currentUser is defined
            if (currentUser) {
                const savedPostRecord = currentUser.save?.find((record: Models.Document) => record.post.$id === post.$id);
                setIsSaved(!!savedPostRecord);
            }
        }
    }, [currentUser, isLoading, isError, post.$id]); 
    const savedPostRecord = currentUser?.save?.find((record: Models.Document) => record.post.$id === post.$id);



    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();
        let newLikes = [...likes];
        const hasLiked = likes.includes(userId);
    
        if (hasLiked) {
            // Remove userId from likes
            newLikes = newLikes.filter((id) => id !== userId);
        } else {
            // Add userId to likes
            newLikes.push(userId);
        }
    
        setLikes(newLikes); // Update the local state
        likePost({ postId: post.$id, likesArray: newLikes }); // Call the API with the updated likes
    };

    const handleSavePost = (e :React.MouseEvent) => {
        e.stopPropagation();
        if (savedPostRecord) {
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id)
        }
        else{
            savePost({postId: post.$id, userId});
            setIsSaved(true);

        }

    };

  return (
    <div className="flex justify-between items-center z-20">
        <div className="flex gap-2 mr-5">
            <img 
            src={checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
            alt="like" 
            width={20}
            height={20}
            onClick={handleLikePost}
            className="cursor-pointer"
            />
            <p className="small-medium lg:base-medium">
                {likes.length}
            </p>
            
        </div>

        <div className="flex gap-2">
        { isSavingPost || isDeletingSaved ? <Loader/> : 
            <img src= {isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="save" 
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
            />}
        </div>

    </div>
  )
}

export default PostStats