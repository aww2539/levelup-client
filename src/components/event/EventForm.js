import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getGames } from "../game/GameManager"
import { createEvent } from "./EventManager"


export const EventForm = () => {
    const history = useHistory()
    const [currentEvent, setEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: "",

    })
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames()
        .then((data) => { setGames(data) })
    }, [])

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange = {
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.gameId = evt.target.value
                                setEvent(copy)
                            }
                        }>
                        <option value={0}>Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange = {
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.description = evt.target.value
                                setEvent(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange = {
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.date = evt.target.value
                                setEvent(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange = {
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.time = evt.target.value
                                setEvent(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    createEvent(currentEvent)
                    .then(history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
