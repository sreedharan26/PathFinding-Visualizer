import React from "react";
import "../styles/sidebar.css"
import start from "./start.png";
import end from "./end1.png";
import wall from "./wall1.png"

export default function Sidebar(props){
    const {dark}=props;
    return (
        <>
            <div className={`sidebar ${dark ? "dark-theme-on" : ""}`}>
                <div className="start">
                    <img src={start} width="40px"></img>
                    <p>Start Node</p>
                </div>
                <div className="end">
                    <img src={end} width="40px"></img>
                    <p>End Node</p>
                </div>
                <div className="x">
                    <img src={wall} width="40px"></img>
                    <p>Wall Node</p>
                </div>
                <div className="x">
                    <div className="unvisited-node"></div>
                    <p>Unvisited Node</p>
                </div>
                <div className="x">
                    <div className="visited-node"></div>
                    <p>Visited Node</p>
                </div>
                <div className="x">
                    <div className="path-node"></div>
                    <p>Path Node</p>
                </div>
                <div className="x">
                    <div className="neighbouring-node"></div>
                    <p>Neighbouring Node</p>
                </div>
            </div>
        </>
    )
}