import React from 'react';
import "./AddAuthorForm.css"


class AuthorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageURL: '',
            books:[ ],
            bookTemp:''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }
    onFieldChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefualt();
        this.props.onAddAuthor(this.state);
    }
    handleAddBook(event){
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp:''
        });
    }
    render(){
    return <form onSubmit={this.handleSubmit}>
    <div className="AddAuthorForm_input">
        <label htmlFor ="name">Name</label>
        <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/> 
    </div>
    <div className="AddAuthorForm_input">
        <label htmlFor ="imageURL">Name</label>
        <input type="text" name="imageURL" value={this.state.imageURL} onChange={this.onFieldChange}/> 
    </div>
    <div className="AddAuthorForm_input">
        {this.state.books.map((book) => <p key={book}>{book}</p>)}
        <label htmlFor="bookTemp">Books></label>
        <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
        <input type="button" value="+" onClick={this.handleAddBook}/>
    </div>
    <input type="submit" value="Add"/>
</form>
}
}


function AddAuthorForm({match, onAddAuthor}){
    return <div>
        <h1 id="addQuestion">Add Author</h1>
<AuthorForm onAddAuthor={onAddAuthor}/>
    </div>;
}

export default AddAuthorForm;