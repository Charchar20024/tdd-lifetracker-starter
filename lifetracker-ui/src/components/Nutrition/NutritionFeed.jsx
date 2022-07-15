import * as React from "react"
import "./NutritionFeed.css"
import NutritionCard from "./NutritionCard"


export default function NutritionFeed({nutritions}) {
    return (
        <div className="nutrition-feed">
            <div className="content">
            <div className="grid">
              {nutritions?.map((nutritions) => (
                <NutritionCard
                  key={nutritions.id}
                  nutritions={nutritions}

                />
              ))}
              {!nutritions?.length ? (
                <div className="empty-message">
                  <p>Nothing here yet</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )
    }

    