import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";

import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import "./styles.css";
import api from "../../services/api";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState(String);
  const [week_day, setWeekDay] = useState(String);
  const [time, setTime] = useState(String);

  useEffect(() => {
    searchTeachers(subject, week_day, time);
  }, [subject, week_day, time]);

  async function searchTeachers(s: string, w: string, t: string) {
    if (!s && !w && !t) {
      return;
    }
    const response = await api.get("classes", {
      params: {
        subject: s,
        week_day: w,
        time: t,
      },
    });
    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação Física", label: "Educação Fisica" },
              { value: "Filosofia", label: "Filosofia" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Informática", label: "Informática" },
              { value: "Inglês", label: "Inglês" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda" },
              { value: "2", label: "Terça" },
              { value: "3", label: "Quarta" },
              { value: "4", label: "Quinta" },
              { value: "5", label: "Sexta" },
              { value: "6", label: "Sabado" },
            ]}
          />
          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeachersList;
