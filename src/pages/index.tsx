import { withUrqlClient } from "next-urql"
import { NavBar } from "../components/NavBar"
import { usePostsQuery } from "../generated/graphql"
import { CreateUrqlClient } from "../utils/createUrlqlClient"


const Index = () => {
  const [{data}] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>
        Hello world
      </div>
      <br  />
      {!data ? "Loading..." : data.posts.map((p) => {
        return <div key={p.id}>{p.title}</div>
      })}
    </>
    )
  }

export default withUrqlClient(CreateUrqlClient, {ssr: true})(Index) 
