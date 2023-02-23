import { Form } from "react-bootstrap"

import "./search-bar.scss"

export const SearchBar = ({ query, setQuery }) => {

    return (
        <div className="search-bar-form w-75 mx-auto ">
            <Form>
                <Form.Control
                    className="text-center"
                    type="search"
                    placeholder="Title, Genre or Director"
                    aria-label="Search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </Form>
        </div>
    )
}