import React, { useState } from "react"
import { getAllPosts } from "../components/blog/blog.api"
import PostPreview from "../components/blog/blog.preview"
import GlobalLayout from "../components/global/global.layout"
import GlobalSearch from "../components/global/global.search"

const Blog = ({ allPosts }) => {
  const morePosts = allPosts
  const emptyQuery = ""
  const [filteredPosts, setFilteredPosts] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = (event) => {
    event.preventDefault()
    const query = event.target.value
    const posts = morePosts || []

    const filteredData = posts.filter((post) => {
      const { title, tags } = post
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        tags.join("").toLowerCase().includes(query.toLowerCase())
      )
    })

    setFilteredPosts({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = filteredPosts
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : morePosts

  return (
    <GlobalLayout>
      <h1
        className="
    text-secondaryLink
    font-semibold
    text-5xl
    mb:pl-3
    mb:pr-3
    mb:mt-10
    smp:mt-10
    xfl:pl-3
    xfl:pr-3
    xfl:mt-10
    lpt:mt-10
    lpt:px-3"
      >
        Blog
      </h1>
      <GlobalSearch
        onSubmit={(event) => event.preventDefault()}
        value={query}
        onChange={handleInputChange}
        submitStyle={{ display: "none" }}
      />
      <ul className="list-none mb-1 grid">
        {posts.map(({ coverImage, tags, date, title, excerpt, slug }) => {
          const tagList = tags.map((tag) => (
            <li
              className="sm:px-6 smp:px-2 py-1 mx-2 sm:bg-link smp:bg-none sm:rounded-full"
              key={Math.random()}
            >
              {tag}
            </li>
          ))
          return (
            <>
              <PostPreview
                me={Math.random()}
                tags={tagList}
                title={title}
                date={date}
                excerpt={excerpt}
                image={coverImage}
                slug={slug}
              />
            </>
          )
        })}
      </ul>
    </GlobalLayout>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
  ])
  return {
    props: {
      allPosts,
    },
  }
}

export default Blog
