import React, { useState, useEffect } from 'react'
import PlanBar from "./PlanBar";
import Planner from './Planner';
import NoHistoryPlan from './NoHistoryPlan';

const Plan = () => {
    const [section, setSection] = useState(0);

    return (
        <div>
            <div className="w-full pt-10">

                <PlanBar section={section} setSection={setSection} />
                {section === 0 &&
                    <Planner />
                }
                {section === 1 &&
                    <NoHistoryPlan />
                }

            </div>
        </div>
    );
}

export default Plan