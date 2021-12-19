import { Select } from "@cruk/cruk-react-components";
import React, { useState } from "react";

/* Split fields into separate fields with their own validation schemas */
export function MediaTypeField(): JSX.Element {
    // TODO BUG fix select options not getting selected
    const [option, setOption] = useState("");
    return (
        <Select
            label="Media type"
            required
            value={option}
            // TODO BUG Set state of this because it is getting overridden with the default
        >
            <option disabled value="">
                --Please select a media type--
            </option>
            <option value="audio" onChange={() => setOption("audio")}>
                Audio
            </option>
            <option
                value="video"
                onChange={() => {
                    console.log("Setting option to video...");
                    setOption("video");
                }}
            >
                Video
            </option>
            <option value="image" onSelect={() => setOption("image")}>
                Image
            </option>
        </Select>
    );
}

export default MediaTypeField;
