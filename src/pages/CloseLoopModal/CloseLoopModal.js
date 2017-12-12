import React from 'react';
import { Button, Header, Image, Modal, List } from 'semantic-ui-react';
import shakeHand from './assets/shake-hand.jpg';
import img from '../Loop/assets/jeannie.jpg';
import img1 from '../Loop/assets/kong.jpg';
import styles from './CloseLoopModal.css';

const mPeople = [
    {
        avatar: img,
        username: 'Helen',
        position: 'Graphic Designer',
        company: 'Linker Co.',
    },
    {
        avatar: img1,
        username: 'Christian',
        position: 'Graphic Designer',
        company: 'ABD Sdn Bhd',
    },
    {
        avatar: img,
        username: 'Helen',
        position: 'Developer',
        company: 'Linker Co.',
    },
    {
        avatar: img,
        username: 'Helen',
        position: 'Architect',
        company: 'Linker Co.',
    },
    {
        avatar: img,
        username: 'Daniel',
        position: 'HR Manager',
        company: 'Asterine Co.',
    },
    {
        avatar: img,
        username: 'Helen',
        position: 'Quality Expert',
        company: 'Linker Co.',
    }
];

export default class CloseLoopModal extends React.Component {
    constructor() {
        super();
        this.state = {
            people: mPeople,
        };
    }

    render() {
        const { people } = this.state;
        return (
            <Modal trigger={<Button>Show Modal</Button>} closeIcon>
                <Modal.Header>Which job you accepted ?</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size="small" src={shakeHand} />
                    <Modal.Description>
                        <List
                            selection
                            verticalAlign="middle"
                            className={styles.scrollDesc}
                        >
                            {people.map((person, index) => (
                                <List.Item key={index}>
                                    <Image avatar src={person.avatar} />
                                    <List.Content>
                                        <List.Header>
                                            {person.username}
                                        </List.Header>
                                        {person.position}<br/><div className={styles.miniFont}>{person.company}</div>
                                    </List.Content>
                                </List.Item>
                            ))}
                            <br />
                        </List>
                        <Button fluid>None :(</Button>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
