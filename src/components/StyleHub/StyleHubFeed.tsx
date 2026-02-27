'use client';

import React, { useEffect, useState } from 'react';
import CreatorCard from './CreatorCard';

export default function StyleHubFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/style/posts');
                console.log('Fetch Response status:', res.status);
                const data = await res.json();
                console.log('Fetched data:', data);
                if (res.ok) {
                    setPosts(data.posts);
                    console.log('Posts state updated with:', data.posts.length, 'posts');
                }
            } catch (err) {
                console.error('Failed to fetch style posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="text-center py-10"><p className="font-serif">Curating styles...</p></div>;

    return (
        <div className="container py-5">
            <header className="mb-5 text-center">
                <p className="text-muted small text-uppercase tracking-widest mb-1">Designer Marketplace</p>
                <h1 className="display-5 font-serif fw-bold">Create. Share. Earn.</h1>
            </header>

            <div className="d-flex gap-4 border-bottom mb-4 pb-2 justify-content-center">
                <button className="btn btn-link text-dark fw-bold text-decoration-none border-bottom border-2 border-dark rounded-0 px-0">Trending</button>
                <button className="btn btn-link text-muted text-decoration-none px-0">New</button>
                <button className="btn btn-link text-muted text-decoration-none px-0">Top Rated</button>
            </div>

            <div className="row g-4 justify-content-center">
                {posts.map((post: any) => (
                    <div key={post.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <CreatorCard
                            creator={post.creator}
                            image={post.image}
                            price={Math.floor(Math.random() * 20000) + 5000}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
