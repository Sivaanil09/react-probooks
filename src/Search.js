import React from 'react';
import { Link } from 'react-router-dom'
import './App.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: JSON.parse(localStorage.getItem("totalbooks")) === null ? [] : JSON.parse(localStorage.getItem("totalbooks")),
            likebooks: JSON.parse(localStorage.getItem("likebooks")) === null ? [] : JSON.parse(localStorage.getItem("likebooks")),
            dislikebooks: JSON.parse(localStorage.getItem("dislikebooks")) === null ? [] : JSON.parse(localStorage.getItem("dislikebooks")),
            readingbooks: JSON.parse(localStorage.getItem("readingbooks")) === null ? [] : JSON.parse(localStorage.getItem("readingbooks")),
            searchTerm: ""
        }
    }


    modifyBook(to, element) {
        for (let i of this.state.likebooks) {
            if (i.title === element.title) {
                this.changeStatus(to, element, "like")
            }
        }

        for (let i of this.state.dislikebooks) {
            if (i.title === element.title) {
                this.changeStatus(to, element, "dislike")
            }
        }

        for (let i of this.state.readingbooks) {
            if (i.title === element.title) {
                this.changeStatus(to, element, "reading")
            }
        }
    }


    changeStatus(to, ele, from) {
        console.log(this.state)

        if (from === to)
            return;

        switch (from) {
            case ("like"): this.setState({
                likebooks: this.state.likebooks.filter(e => e !== ele)
            })
                break;
            case ("dislike"): this.setState({
                dislikebooks: this.state.dislikebooks.filter(e => e !== ele)
            })
                break;
            case ("reading"): this.setState({
                readingbooks: this.state.readingbooks.filter(e => e !== ele)
            })
                break;
            default: break;
        }

        switch (to) {
            case ("like"): this.setState(prevState => ({
                likebooks: [...prevState.likebooks, ele]
            }))
                break;
            case ("dislike"): this.setState(prevState => ({
                dislikebooks: [...prevState.dislikebooks, ele]
            }))
                break;
            case ("reading"): this.setState(prevState => ({
                readingbooks: [...prevState.readingbooks, ele]
            }))
                break;
            default: break;
        }

    }

    DynamicSearch = (str) => {
        return this.state.books.filter(ele => ele.title.toLowerCase().includes(str.toLowerCase()))
    }

    render() {
        let found = []
        found = this.DynamicSearch(this.state.searchTerm)
        localStorage.setItem("likebooks", JSON.stringify(this.state.likebooks))
        localStorage.setItem("dislikebooks", JSON.stringify(this.state.dislikebooks))
        localStorage.setItem("readingbooks", JSON.stringify(this.state.readingbooks))
        return <div className='wholePage'>
            <input type="text" className="searchInput" placeholder="Search books" onChange={(e) => { this.setState({ searchTerm: e.target.value }) }} />
            <h2>Results</h2>
            <div className='parentResults'>
                {found.map((e) => {
                    return <div className='bookCard'>
                        <div><img src={e.imageLinks.thumbnail} alt=""></img></div>
                        <div>{e.title}</div>
                        <div className='author'>{e.authors[0]}</div>

                        <div>
                            <select onChange={(event) => this.modifyBook(event.target.value, e)} value="none">
                                <option value="none" disabled={true}>▼</option>
                                <option value="like" className='hide'>👍</option>
                                <option value="dislike" className='hide'>👎</option>
                                <option value="reading" className='hide' selected={true}>📚</option>
                            </select>
                        </div>
                    </div>

                })
                }
            </div >

            <Link to="/"><button className='button'>&#60;</button></Link>
        </div >
    }
}
export default Search;
