import './Sidebar.scss';
import { Accordion, ListGroup } from 'react-bootstrap';

function Sidebar() {
  return (
    <>
      <section className="sidebar px-2 py-4">
        <h2 className="h6 pb-3"><b>Selecione o carro e rotas:</b></h2>

        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header className='sidebar__item'>Veículo: 1</Accordion.Header>
            <Accordion.Body className='px-1'>
              <ListGroup variant="flush">
                <ListGroup.Item action>
                  Link 1
                </ListGroup.Item>
                <ListGroup.Item action>
                  Link 2
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className='sidebar__item'>Veículo: 2</Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                <ListGroup.Item action>
                  Link 1
                </ListGroup.Item>
                <ListGroup.Item action>
                  Link 2
                </ListGroup.Item>
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </>
  )
}

export default Sidebar;