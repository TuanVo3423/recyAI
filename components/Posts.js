import React from 'react'
import Post from './Post'

const posts=[{
  id:'123',
  username: 'pupu',
  userImg:'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png',
  img:'https://images.pexels.com/photos/409696/pexels-photo-409696.jpeg?cs=srgb&dl=pexels-karol-d-409696.jpg&fm=jpg',
  caption:'lesss go',

},
{
  id:'123',
  username: 'pupu',
  userImg:'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png',
  img:'https://images.pexels.com/photos/409696/pexels-photo-409696.jpeg?cs=srgb&dl=pexels-karol-d-409696.jpg&fm=jpg',
  caption:'lesss go',

},

]

function Posts() {
  return (
    <div>
      {posts.map((post)=>(
      <Post
      key={post.id}
      id={post.id}
      username={post.username}
      userImg={post.userImg}
      img={post.img}
      caption={post.caption}
      />
      ))}
      
    </div>
  )
}

export default Posts