import P from 'prop-types'

export const MessageContainer = ({messages}) => {
    console.log(messages)
    return (
        <>
        {
            messages.map((msg, index) => 
                <div  key={index}>
                    <table>
                        <tr>
                            <td>{msg.msg} - {msg.userName}</td>
                        </tr>
                    </table>
                </div>
            )
        }
        </>
    )
}

MessageContainer.propTypes = {
    messages: P.array
}