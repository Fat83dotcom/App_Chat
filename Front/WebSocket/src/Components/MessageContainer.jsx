import P from 'prop-types'

export const MessageContainer = (messages) => {
    return (
        <>
        {
            messages.map((msg, index) => {
                <table>
                    <tr key={index}>
                        <td>{msg.msg} - {msg.userNmae}</td>
                    </tr>
                </table>
            })
        }
        </>
    )
}

MessageContainer.propTypes = {
    messages: P.array
}