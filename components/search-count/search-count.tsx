interface Props {
  count: number;
  searchText: string;
}

export default function SearchCount({ count, searchText }: Props) {
  return (
    <output data-visually-hidden={!searchText}>
      {count === 0 ? "No results" : `${count} result${count > 1 ? "s" : ""}`}
    </output>
  );
}
