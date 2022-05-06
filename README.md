pre-render SSG -> Context -> Airtable DB

Home page
사용자의 좌표를 받아와서 api호출 context에 저장후 받아와 CSR

Coffee Store page
Pre-reder page가 아닐경우 context 에서 해당id로 받아오기
새로 고침시 없어짐.

Coffee Store page 진입시
헤딩 id 와 body를 받아와서 db에 생성.
db에 id가 있을시 db 로부터 받아오고 없으면 새로 생성하고 받아오기.
