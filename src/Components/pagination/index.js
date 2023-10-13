import React from "react";
import buttonRight from '../../SVG/button-rigth.svg'
import buttonLeft from '../../SVG/button-pokemon-page.svg'
const Pagination = ({page, totalPages, onLeftClick, onRightClick})=>{
    return(
        <div className="pagination-container">
            <button onClick={onLeftClick}><img src={buttonRight}></img></button>
            <div className="pagination-pageAndTotalPages">{page} de {totalPages}</div>
            <button onClick={onRightClick}><img src={buttonLeft}></img></button>
        </div >
    )
}

export default Pagination