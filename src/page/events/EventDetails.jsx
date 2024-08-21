import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetcheventsssById } from "../../redux/feature/eventSlice/eventSlices";
import { useParams } from "react-router-dom";
import EventDetailCard from "../../components/eventCardAll/EventDetailCard";

export default function EventDetails() {
  const param = useParams();
  const seletByid = useSelector((state) => state?.event?.eventId);

  const dispachaaa = useDispatch();
  useEffect(() => {
    dispachaaa(fetcheventsssById(param.id));
  }, []);

  return (
    <div className="w-10/12 mx-auto">
      <EventDetailCard
        slug={seletByid.slug}
        title={seletByid.title}
        img={seletByid.thumbnail}
        about={seletByid.about}
        date={seletByid.date}
        description={seletByid.description}
        id={seletByid.id}
      />
    </div>
  );
}
