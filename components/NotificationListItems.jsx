import React from 'react'
import Image from 'next/image'

const NotificationListItems = ({ getLikedPostOrComment, note }) => {
  return (
    <li
            key={note._id}
            className="w-full border-b-2 border-dotted border-white hover:bg-gradient-to-r from-yellow-800/0 to-yellow-800 cursor-pointer"
          >
            <div
              className="flex flex-col"
              onClick={() => getLikedPostOrComment(note.postId)}
             >
              {(note.post || note.comment) && (
                <div className="flex w-full flex-col text-yellow-900 pl-4 pr-2">
                  <div className="flex justify-center pb-2 mt-4">
                    <Image
                      src={note?.sender?.avatar || "/images/defaultAvatar1.png"}
                      alt="logo"
                      width={100}
                      height={0}
                      className="h-[40px] w-[40px] rounded-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-start">
                    <div className="text-white">
                      <span className="font-bold">
                        {note.sender?.name || note.sender?.username}
                      </span>{" "}
                      {note.type === "like" &&
                        (note.post ? (
                          <>
                            <span className="text-base font-normal">vindt je bericht leuk:</span> <br />
                            <span>
                              {note.post?.postContent.length < 60
                                ? note.post?.postContent
                                : note.post?.postContent.slice(0,60) + "..."}
                            </span>

                          </>
                        ) : (
                          <>
                            <span className="text-base font-normal">vindt je reactie leuk: </span><br />
                            <span>
                              {note.comment?.comment.length < 60
                                ? note.comment?.comment
                                : note.comment?.comment.slice(0, 60) + "..."}
                            </span>
                          </>
                        ))}
                        
                      {note.type === "comment" &&
                        (note.comment?.parentId && note.comment ? (
                          <>
                            reageerde op jou reactie: <br />
                            <span>{note.comment?.comment}</span>
                          </>
                        ) : (
                          <>
                            reageerde op jou bericht: <br />
                            <span>
                              {note.comment?.comment.length < 35
                                ? note.comment?.comment
                                : note.comment?.comment.slice(0, 35) + "..."}
                            </span>
                          </>
                        ))}
                    </div>

                    <div className="mb-6 flex flex-col pb-2">
                      <small className="pt-1 text-orange-300">
                        Gepost op : {new Date(note.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
  )
}

export default NotificationListItems