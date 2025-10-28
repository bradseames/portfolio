// src/routes/PostPage.jsx
import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

// Dynamically import the MDX file based on a route parameter (e.g., postId)
// NOTE: The exact import syntax depends heavily on your bundler/setup.
const PostContent = lazy((name: string | undefined) => import(`../content/${postId}.mdx`));

function PostRoute() {
  const { postId } = useParams();

  return (
    <Suspense fallback={<div>Loading post...</div>}>
      <PostContent />
    </Suspense>
  );
}