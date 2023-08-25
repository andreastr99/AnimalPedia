import React from 'react'

const BlogPost = ({article}) => {

    return (
        <>
            <div className="blog-post">
                <h1 className="blog-post-title">{article.title}</h1>
                <p className="blog-post-meta text-muted">{article.date} <strong>{article.author}</strong></p>
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            <hr />
        </>
    )
}

export default BlogPost