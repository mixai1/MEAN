import React from 'react';
import {Link} from 'react-router-dom';

export const ListLinks = ({ links }) => {
    if(!links.length){
       return (<p className = "center">No links yet, Sorry</p>);
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Origine links</th>
                    <th>Cut links</th>
                    <th>Open</th>
                </tr>
            </thead>

            <tbody>
                {links.map((link,index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index+1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to = {`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
