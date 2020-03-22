import React from 'react';
import './App.css'
import axios from 'axios'



class App extends React.Component{

state={
  title:'',
  body:'',
  posts:[]

}
handleChange=({target})=>{
const {name,value} = target;
this.setState({
  [name]:value
})
}

submit=(event)=>{
event.preventDefault();
const payload={
  title: this.state.title,
  body:this.state.body
}
axios.post("/api/save",payload).then(()=>{
  console.log('Data have been sent to teh server')
  this.resetUsserInputs();
  this.getBlogPost();
}).catch(()=>{
  console.log('internal server  din din error')
});

// axios({
//   url:'/api/save',
//   method: 'POST',
//   data: payload
// })
// .then(()=>{
//     console.log('Data have been sent to teh server')
//   }).catch(()=>{
//     console.log('internal server  din din error')
//   });;
};
componentDidMount=()=>{
  this.getBlogPost();
}

resetUsserInputs=()=>{
  this.setState({
    title:'',
    body:''
  })
}
getBlogPost=()=>{
  axios.get("/api")
  .then((response)=>{
    const data=response.data;
this.setState({posts:data})
console.log('Data have been received!!')
  }).catch(()=>{
    alert('Error retrivig data!!!')
  })
}
displayBlogPost=(posts)=>{
  if(!posts.length) return null;

  return posts.map((post, index)=>(
    <div key={index} className='display'>
    <h3>{post.title}</h3>
  <p>{post.body}</p>
  </div>
  ))
}

  render(){
    console.log(`state`, this.state)
    return(
      <div className='app'>
        <h2>
         Welcome to my App 
        </h2>
        <form onSubmit={this.submit}>
          <div className='form-input'>
            <input
             type='text'
             name='title'
             placeholder='Enter a tittle'
             value={this.state.title}
             onChange={this.handleChange}
            />
          </div>
          <div className='form-input'>
            <textarea
            name='body'
            value={this.state.body}
            placeholder='Body'
            cols='30'
            rows='10'
            onChange={this.handleChange}
            ></textarea>
          </div>
          <button>Submit</button>
        </form>

        <div>
        {this.displayBlogPost(this.state.posts)}
        </div>
      
      </div>
      
      
    );
  }

}

export default App;
