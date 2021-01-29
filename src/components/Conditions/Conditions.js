import React from 'react';
import classes from './Conditions.module.css';
import {Card} from 'react-bootstrap';

const conditions = (props) => {
   return (
       <div className={classes.Wrapper}>
           {props.error && <small>Please enter a valid city.</small>}
           {props.loading && <div className={classes.Loader}>Loading...</div>}
           {props.responseObj.cod === 200 ?
               <div>
                   <Card style={{ width: '18rem' }} className={classes.Card}>
                        <Card.Img variant="top" src={`http://openweathermap.org/img/wn/${props.responseObj.weather[0].icon}@2x.png`} />
                        <Card.Body>
                            <Card.Title><strong>{props.responseObj.name}</strong></Card.Title>
                            <Card.Text>
                            It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.
                            </Card.Text>
                        </Card.Body>
                    </Card>
               </div>
           : null
           }
           
       </div>
   )
}
export default conditions;