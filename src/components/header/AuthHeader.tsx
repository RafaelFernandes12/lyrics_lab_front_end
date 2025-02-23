export function AuthHeader() {
  return (
    <header
      className={`flex h-[80px] items-center justify-between bg-white px-[4%] `}
    >
      <div className="flex w-fit items-center justify-start gap-4">
        <svg
          data-testid="logo"
          width="64"
          height="40"
          viewBox="0 0 64 40"
          className="fill-black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5248 13.8971L22.5803 0.445321C22.6995 0.218094 22.9349 0.0757446 23.1915 0.0757446H30.9405H44.7779L26.4502 36.1469C26.0206 36.9926 25.4204 37.74 24.6874 38.342C24.0228 38.888 23.2614 39.3042 22.4431 39.5689L22.1082 39.6773C21.4473 39.8911 20.7538 40 20.0591 40C19.3061 40 18.5552 39.8713 17.8455 39.6195C17.0064 39.3217 16.2361 38.8575 15.5808 38.2547L15.484 38.1656C14.9533 37.6774 14.4984 37.1127 14.1342 36.4902L8.18066 26.3139H28.9746L29.6551 25.3309L30.26 24.0454H20.9585C20.6071 24.0454 20.2566 24.0107 19.9121 23.9418C19.2552 23.8104 18.6288 23.5565 18.0659 23.1933L17.4934 22.824C16.8854 22.4317 16.3532 21.9328 15.9225 21.3513C15.3566 20.5874 14.9801 19.7002 14.8238 18.7624L14.7802 18.5011C14.7158 18.1148 14.6835 17.719 14.6835 17.3273C14.6835 16.1377 14.9722 14.9506 15.5248 13.8971Z"
            fill="#1F1F20"
            className="fill-black"
          />
          <path
            d="M1.84433 16.9262L7.04721 24.9528L16.2013 8.03321C18.0727 4.5743 15.4026 0.408609 11.4783 0.664545L10.0718 0.756272C2.0268 1.19386 -2.53805 10.1655 1.84433 16.9262Z"
            fill="#1F1F20"
            className="fill-black"
          />
          <path
            d="M39.8729 13.8214L46.9108 0.403301C47.0391 0.158755 47.301 0.0144877 47.5763 0.0368044L55.5155 0.680527C61.7165 1.14649 65.4283 7.79268 62.5727 13.3167L50.8018 36.0865C50.3697 36.9223 49.7719 37.6614 49.0449 38.2586C48.3741 38.8096 47.6057 39.2297 46.7798 39.4969L46.4564 39.6015C45.7954 39.8154 45.1019 39.9243 44.4073 39.9243C43.6542 39.9243 42.9033 39.7956 42.1936 39.5438C41.3545 39.246 40.5842 38.7818 39.9289 38.1789L39.8321 38.0899C39.3014 37.6016 38.8465 37.0369 38.4823 36.4145L32.5288 26.2381H53.3227L54.0032 25.2551L54.6081 23.9697H45.3066C44.9553 23.9697 44.6048 23.935 44.2602 23.8661C43.6033 23.7347 42.977 23.4808 42.414 23.1176L41.8415 22.7482C41.2335 22.3559 40.7013 21.857 40.2706 21.2756C39.7047 20.5117 39.3282 19.6244 39.1719 18.6867L39.1284 18.4254C39.064 18.0391 39.0316 17.6432 39.0316 17.2516C39.0316 16.0619 39.3203 14.8749 39.8729 13.8214Z"
            fill="#1F1F20"
            className="fill-black"
          />
        </svg>
        <h1 className="italic text-black">Lyrics Lab</h1>
      </div>
    </header>
  )
}
