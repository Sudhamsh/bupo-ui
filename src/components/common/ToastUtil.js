/**
 * Created by sudhamshbachu on 1/28/21.
 */
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';


 export const ToastUtil = (props) => {
    const toast = useToast()
    const toastIdRef = React.useRef()

    function close() {
        if (toastIdRef.current) {
            toast.close(toastIdRef.current)
        }
    }

    function closeAll() {
        // you may optionally pass an object of positions to exclusively close
        // keeping other positions opened
        // e.g. `{ positions: ['bottom'] }`
        toast.closeAll()
    }

    function addToast() {
        toast.closeAll()
        toastIdRef.current = toast({ description: "some text" })
    }

    return (
        <>
        </>
    )
}

export default ToastUtil;