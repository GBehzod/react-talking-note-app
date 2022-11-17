import {Button, Col, Form, Modal, Row, Stack} from "react-bootstrap";
import {Tag} from "../App";

type EditTagsModalProps = {
    show: boolean,
    handleClose: () => void,
    availableTags: Tag[],
    updateTag: (id: string, label: string) => void,
    deleteTag: (id: string) => void,
}

const EditTagsModal = ({show, handleClose, availableTags, updateTag, deleteTag}: EditTagsModalProps) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => (
                            <Row key={tag.id}>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        onChange={(e) => updateTag(tag.id, e.target.value)}
                                        defaultValue={tag.label}/>
                                </Col>
                                <Col xs="auto">
                                    <Button type="button" onClick={() => deleteTag(tag.id)}
                                            variant="outline-danger">&times;</Button>
                                </Col>
                            </Row>
                        ))}
                    </Stack>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Stack className="justify-content-end">
                    <Button type="button" onClick={handleClose}>Close</Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTagsModal;
