import React from 'react'; // Ensure you have React imported

function Score(props) {
    const { data } = props;

    const scoreLines = data.text.split('~'); // Split into lines

    return (
        <div className='score-card'>
            <div className='score-card-name'>
                <p>{data.name}</p>
            </div>
            <div className='score-card-text'>
                {scoreLines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
}

export default Score;