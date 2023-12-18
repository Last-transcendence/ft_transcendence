import React from "react";
import style from "@/style/common/buttom-button/index.module.css";

interface BottomButtonProps {
    title: string;
    onClick?: () => void;
}

interface ConfirmBottomButtonProps {
    onOk:() => void;
    onCancel: () => void;
}


export const BottomButton = ({title, onClick}: BottomButtonProps) => {
    return <button onClick={onClick} className={style.container}>{title}</button>
}


export const ConfirmBottomButton = ({onOk, onCancel}: ConfirmBottomButtonProps) => {
    return <div style={{display: 'flex', flexDirection: 'column'}} className={style.confirmContainer}>
        <button onClick={onOk} className={style.button}>예</button>
        <button onClick={onCancel} className={style.button}>아니오</button>
    </div>
}
