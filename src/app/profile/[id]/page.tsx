import React from 'react'

function UserProfile({ params }: any) {
    return (
        <div>UserProfile
            <div>{params.id}</div>
        </div>
    )
}

export default UserProfile