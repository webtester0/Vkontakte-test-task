import React, { useState, useCallback, useRef, useEffect } from "react";
import { Card } from "components/Card";
import { Button } from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { styled } from "linaria/react";

export const AddForm = ({ isEmptyColumn, addColumn, addCard, columnIndex }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handlerClick = () => setOpen(state => !state);

  const textareaRef = useRef(null);

  const handleKeyDown = e => {
    if (e.keyCode == 27) {
      setOpen(false);
    }
  };

  const handleOnChange = useCallback(
    e => {
      setValue(e.target.value);
    },
    [value]
  );

  const onAdd = () => {
    if (!isEmptyColumn) {
      addColumn(value);
    } else {
      addCard(value, columnIndex);
    }
    setValue("");
    setOpen(false);
  };

  useEffect(() => {
    open ? textareaRef.current.focus() : null;

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      {open ? (
        <Form>
          <Card columnIndex={columnIndex} cardIndex={9999}>
            <Input>
              <textarea
                ref={textareaRef}
                rows="3"
                placeholder={
                  !isEmptyColumn
                    ? "Введите название колонки"
                    : "Введите название карточки"
                }
                onChange={handleOnChange}
                value={value}
              ></textarea>
            </Input>
          </Card>
          <Footer>
            <Button onClick={onAdd}>Добавьте карточку</Button>
            <IconClear onClick={handlerClick}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                color={"#c5ccd2"}
                size="2x"
              />
            </IconClear>
          </Footer>
        </Form>
      ) : (
        <ButtonAdd onClick={handlerClick}>
          <Icon>
            <FontAwesomeIcon icon={faPlus} />
          </Icon>
          <span>
            {!isEmptyColumn
              ? "Добавить карточку"
              : "Добавить еще одну карточку"}
          </span>
        </ButtonAdd>
      )}
    </>
  );
};

const Form = styled.div`
  padding: 12px 12px 12px 12px;
`;

const Icon = styled.span`
  margin-right: 8px;
`;

const IconClear = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

const ButtonAdd = styled.button`
  padding: 12px;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background-color: transparent;
  font: inherit;
  color: inherit;
  &:hover {
    border-radius: 0 0 3px 3px;
    cursor: pointer;
    background-color: #c5ccd2;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Input = styled.div`
  textarea {
    border: 0px;
    padding: 0px;
    margin: 0px;
    width: 100%;
    resize: none;
    cursor: text;
  }
`;
