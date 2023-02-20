import { Button, Card } from "react-bootstrap"
import moment from 'moment'

import './user-info.scss'

export const UserInfo = ({ email, name, birthday, setShowUpdateUserForm }) => {

    const formatededBirthday = moment(birthday).format('DD/MM/YYYY')

    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-4 p-2 text-center user-info-card-title">Welcome to Your Movie Box!</Card.Title>
                <Card.Text>{`Name: ${name}`}</Card.Text>
                <Card.Text>{`Email: ${email}`}</Card.Text>
                <Card.Text>{`Birthday: ${formatededBirthday}`}</Card.Text>
                <Button onClick={() => setShowUpdateUserForm(true)}>Edit</Button>
            </Card.Body>
        </Card>
    )

}
