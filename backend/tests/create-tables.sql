create table todos
(
    id      serial primary key,
    name    varchar(100) not null,
    archived boolean,
    done    boolean
);
