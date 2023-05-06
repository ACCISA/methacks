import AddFamilyForm from "../AddFamilyForm";
const bgFam = {
    backgroundImage: 'url("src/images/webImg.webp")',

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    color: "white",
    position: 'absolute',
    top: '0',
    left: '0',
    width: "100%",
    height: '100%'
}
export default function AddFamily() {
    return (
        <>
        <div style={bgFam} id="bkng2" className="p-0 h-full  flex-col justify-center align-middle">
            <AddFamilyForm />
        </div>
        </>
    )
}