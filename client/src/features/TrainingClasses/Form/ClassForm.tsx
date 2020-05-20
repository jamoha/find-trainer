import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { ITrainingClass } from "../../../Interfaces/ITrainingClasses";
import TrainingClassStore from "../../../app/stores/TrainingClassStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { DetailParams } from "../../../app/_models/_IDetailParams";
const ClassForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const {
    selectedClass: initialFormState,
    createTrainingClass,
    editTrainingClass,
    getTrainingClass,
    reset,
  } = useContext(TrainingClassStore);
  const initialSetUp = () => {
    if (initialFormState) return initialFormState;
    else if (match.params.id) {
      getTrainingClass(match.params.id).then(() => {
        return initialFormState;
      });
    }
    return {
      id: "",
      address: "16932 71 ave",
      category: "bodybuilding",
      city: "surrey",
      country: "Canada",
      dayOfWeek: 2,
      description: "Hello this is a group training class",
      time: "12:00AM",
      postalCode: "V4NDL3",
      province: "BC",
      title: "TITLE",
      totalSpots: 0,
    };
  };
  const [form, setForm] = useState<ITrainingClass>(initialSetUp);

  const onChangeInput = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value, type } = e.currentTarget;
    if (type === "number") {
      setForm({ ...form, [name]: parseInt(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const onSubmit = () => {
    if (form.id.length === 0) {
      createTrainingClass({
        ...form,
        id: uuidv4(),
      });
    } else {
      editTrainingClass(form);
    }
  };
  useEffect(() => {
    console.log("hi");
    return () => {
      reset();
      console.log("bye", initialFormState);
    };
  }, [reset, match.params.id, initialFormState]);

  return (
    <Segment clearing>
      <Form onSubmit={onSubmit}>
        <Form.Input
          name="title"
          placeholder="Title"
          value={form?.title}
          onChange={onChangeInput}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          value={form?.category}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="City"
          name="city"
          value={form?.city}
          onChange={onChangeInput}
        />
        <Form.Input
          name="country"
          placeholder="Country"
          value={form?.country}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="Province"
          name="province"
          onChange={onChangeInput}
          value={form?.province}
        />
        <Form.Input
          placeholder="Address"
          name="address"
          value={form?.address}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="Postal Code"
          name="postalCode"
          value={form?.postalCode}
          onChange={onChangeInput}
        />
        <Form.Input
          placeholder="Day of Week"
          name="dayOfWeek"
          type="number"
          onChange={onChangeInput}
          value={form.dayOfWeek}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          value={form?.description}
          onChange={onChangeInput}
        />
        <Form.Input
          type="time"
          placeholder="time"
          name="time"
          value={form?.time}
          onChange={onChangeInput}
        />

        <Form.Input
          placeholder="Total Spots"
          name="totalSpots"
          onChange={onChangeInput}
          value={form.totalSpots}
          type="number"
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => history.push("/trainingClassess")}
        />
      </Form>
    </Segment>
  );
};

export default observer(ClassForm);
