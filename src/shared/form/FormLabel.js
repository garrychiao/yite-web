import InfoTag from 'shared/InfoTag';

export default function FormLabel({ text, info }) {
  return (
    <>
      {text}
      {info && <InfoTag style={{ margin: '0 0 0 10px' }}>{info}</InfoTag>}
    </>
  );
}
