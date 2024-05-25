import React, {useEffect} from 'react'; // Ensure you have React imported

function Score(props) {
    const { data } = props;
    console.log(data);
    let scoreLines = '';
    scoreLines = data[1].text.split('~'); // Split into lines


    return (
        <div className='score-card'>
            <div className='score-card-name'>
                <p>{data[1].player}</p>
            </div>
            <div className='score-card-text'>
                {scoreLines?.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
}

export default Score;