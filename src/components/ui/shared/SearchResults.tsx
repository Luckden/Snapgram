import { Loader } from 'lucide-react';
import React from 'react'
import GridPostList from './GridPostList';
import { Models } from 'appwrite';

type SearchResultsProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[];
}

const SearchResults = ( {isSearchFetching, searchedPosts}: SearchResultsProps) => {
    if (isSearchFetching){ return <Loader />}
    if (searchedPosts && searchedPosts.documents.length > 0){
        return (
            <GridPostList posts={searchedPosts.documents} />
        )
    }
  return (
    <p className="text-light-4 mt-10 text-center w-full"> No Results found</p>
  )
}

export default SearchResults