import React, { Component } from 'react'
import RadioButton from '../layout/RadioButton'
import PropTypes from 'prop-types'

class FilterByRuntime extends Component {
    static propTypes = {
        handleFilterByRuntime: PropTypes.func.isRequired,
        runtime: PropTypes.number.isRequired
    }

    state = {
        runtimes: [
            {
                runtime: "90",
                runtimeId: "runtime-90",
                runtimeText: "1h 30min"
            },
            {
                runtime: "120",
                runtimeId: "runtime-120",
                runtimeText: "2h"
            },
            {
                runtime: "150",
                runtimeId: "runtime-150",
                runtimeText: "2h 30min"
            },
            {
                runtime: "180",
                runtimeId: "runtime-180",
                runtimeText: "3h"
            },
            {
                runtime: "9999",
                runtimeId: "runtime-all",
                runtimeText: "All the time in world"
            }
        ]
    }

    render() {
        const { runtime, handleFilterByRuntime } = this.props;
        
        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="filter-runtime" className="film-filter">
                        <div id="runtimes">
                            <h2 className="filter-header">How much time do you have?</h2>	
                                <div id="runtimes-filters" onChange={(e) => handleFilterByRuntime(e)}>
                                    {this.state.runtimes.map((r, index) => {
                                        return (
                                            <RadioButton key={index}
                                                runtime={r.runtime}
                                                runtimeId={r.runtimeId}
                                                runtimeText={r.runtimeText}
                                                selectedRuntime={runtime}
                                            />
                                            )                            
                                    })}  
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default FilterByRuntime
