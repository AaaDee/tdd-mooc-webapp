create table todos
(
    id      integer primary key,
    name    varchar(100) not null,
    archived boolean,
    done    boolean
);
